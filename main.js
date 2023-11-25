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


const cluster = new net.Socket();

const secureCluster = new tls.TLSSocket() 

let tlsEnabled = false

/* Connect
** host - cluster host
** port - cluster port
** username - database user username
** password - database user password
** tls bool
*/
async function Connect(host, port, username, password, tls) {
    tlsEnabled = tls;
    if (!tls) {
        return new Promise((resolve, reject) => {
            cluster.connect(port, host, function() {
                cluster.write("Authentication: " + Buffer.from(username + "\\0" + password).toString('base64') +"\r\n");

                cluster.on('data', function (data) {
                    if (data.toString().startsWith("0")) {
                        resolve(cluster)
                    } else {
                        reject(data.toString())
                    }
                });
                
            });

        })
    } else {
        return new Promise((resolve, reject) => {
            secureCluster.connect(port, host, function() {
                secureCluster.write("Authentication: " + Buffer.from(username + "\\0" + password).toString('base64') +"\r\n");

                secureCluster.on('data', function (data) {
                    if (data.toString().startsWith("0")) {
                        resolve(client)
                    } else {
                        reject(data.toString())
                    }
                });
                
            });

        })
    }


}

async function Query(queryString) {
    if (!tlsEnabled) {
        return new Promise((resolve, reject) => {
            cluster.write(queryString +"\r\n");

            cluster.on('data', function (data) {
                resolve(data.toString())
            });

        })
    } else {
        return new Promise((resolve, reject) => {
            secureCluster.write(queryString +"\r\n");

            secureCluster.on('data', function (data) {
                resolve(data.toString())
            });

        })
    }
}

async function Close() {
    if (!tlsEnabled) {
        cluster.end()
    } else {
        secureCluster.end()
    }
}


const cursusdb = {
    Connect,
    Query,
    Close,
}

export default cursusdb