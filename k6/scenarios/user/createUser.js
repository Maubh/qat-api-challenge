import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';



export default function () {
    const username = `User-${randomString(10)}`;
    const email = `${username}@test.com`;
    let response = http.post('https://petstore3.swagger.io/api/v3/user', JSON.stringify({
        id: randomIntBetween(1, 100),
        username: username,
        firstName: 'Alberto',
        lastName: 'Rodrigues', 
        email: email,
        password: 'fsdfd#$a',
        phone: '55319444441111',
        userStatus: 1 

    }), {
        headers: { 'Content-Type': 'application/json'},
    });

    check(response, { 'is status 200': (r) => r.status === 200});
    sleep(1);
}
