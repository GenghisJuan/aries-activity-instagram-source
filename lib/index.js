import {Activity, singleS3StreamOutput} from 'aries-data';
import Instagram from 'instagram-node';
import promisify from 'es6-promisify';

export default class InstagramSource extends Activity {
  static props = {
    name: require('../package.json').name,
    version: require('../package.json').version
  };

  @singleS3StreamOutput('json')
  async onTask(activityTask, config) {
    let data = null;
    const client = this.authenticatedClient(config);
    if (typeof this[config.method] === 'function') {
      data = await this[config.method](config, client);
    }

    return data;
  }


  authenticatedClient({client_id, secret, token}) {
    const client = Instagram.instagram();
    if (token) {
      client.use({
        access_token: token
      });
    }
    else {
      client.use({
        client_id: client_id,
        client_secret: secret
      })
    }
    return client;
  }

  async userSelf({}, ig) {
    const getUserSelf = promisify(ig.user, ig);
    const user = await getUserSelf('self')
    return user;
  }

  async userSelfMediaRecent({count, min_timestamp, max_timestamp, min_id, max_id}, ig) {
    const getuserSelfMediaRecent = promisify(ig.user_self_media_recent, ig);
    const media = await getuserSelfMediaRecent({count, min_timestamp, max_timestamp, min_id, max_id})
    return media;
  }

};