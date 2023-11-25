/*
* CursusDB
* Cluster
* ******************************************************************
* Copyright (C) 2023 CursusDB
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import net from 'net'

const client = new net.Socket();

/* Connect
** host - cluster host
** port - cluster port
** username - database user username
** password - database user password
*/
async function Connect(host, port, username, password) {
    return new Promise((resolve, reject) => {
        client.connect(port, host, function() {
            client.write("Authentication: " + Buffer.from(username + "\\0" + password).toString('base64') +"\r\n");

            client.on('data', function (data) {
                if (data.toString().startsWith("0")) {
                    resolve(client)
                } else {
                    reject(data.toString())
                }
            });
            
        });

    })


}

async function Query(queryString) {
    return new Promise((resolve, reject) => {
        client.write(queryString +"\r\n");

        client.on('data', function (data) {
            resolve(data.toString())
        });

    })
}

async function Close() {
    client.end()
}


const cursusdb = {
    Connect,
    Query,
    Close,
}

export default cursusdb