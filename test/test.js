import test from 'blue-tape';
import InstagramSource from '../lib/index.js';
import config from './test-config';

// example - make sure configuration is the same
test('proper configuration', t => {
    const activity = new InstagramSource();
    t.equal(InstagramSource.props.name, require('../package.json').name);
    t.equal(InstagramSource.props.version, require('../package.json').version);
    t.end();
});

test('test method userSelf', async (t) => {
    t.plan(1);
    const { client_id, secret, token } = config;
    const source = new InstagramSource();
    const client = source.authenticatedClient(config);
    const data = await source.userSelf({}, client);
    t.comment(JSON.stringify(data));
    t.ok(data.username)
});

test('test method userSelfMediaRecent', async (t) => {
    t.plan(1);
    const { client_id, secret, token, count, min_timestamp, max_timestamp, min_id, max_id} = config;
    const source = new InstagramSource();
    const client = source.authenticatedClient(config);
    const data = await source.userSelfMediaRecent(config, client);
    t.comment(JSON.stringify(data));
    t.pass();
});