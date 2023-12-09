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
import tls from 'tls'


const cluster = {
    tls: false,
    socket: undefined,
    connect: connect,
    query: query,
    close: close,
}
/* Connect
** host - cluster host
** port - cluster port
** username - database user username
** password - database user password
** tls bool
*/
async function connect(host, port, username, password, tlsIn) {
    cluster.tls = tlsIn
    cluster.socket = tlsIn ? new tls.TLSSocket() : new net.Socket()
        return new Promise((resolve, reject) => {
            cluster.socket.connect(port, host, function() {
                cluster.socket.write("Authentication: " + Buffer.from(username + "\\0" + password).toString('base64') +"\r\n");

                cluster.socket.on('data', function (data) {
                    if (data.toString().startsWith("0")) {
                        resolve(cluster)
                    } else {
                        reject(data.toString())
                    }
                });
                
            });

        })
    
    


}

async function query(queryString) {
        return new Promise((resolve, reject) => {
            cluster.socket.write(queryString +"\r\n");

            cluster.socket.on('data', function (data) {
                resolve(data.toString())
            });

        })
    
}

async function close() {
        cluster.socket.end()
    
}



export default cluster