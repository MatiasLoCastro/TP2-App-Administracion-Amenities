import { UserApp } from '../models/UserApp';
import Dao from './Dao.js'
import { ConectarMongodb } from './ConectarMongodb.js'

class UserAppDaoMongodb implements Dao<UserApp, string> {

    private conectarMongodb: ConectarMongodb = new ConectarMongodb();

    async add(element: UserApp): Promise<UserApp> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('usuarios');
        await collection.insertOne(element);
        await this.conectarMongodb.desconectar();
        return Promise.resolve(element);
    }
    async getAll(): Promise<UserApp[]> {
        const usuarios: Array<UserApp> = [];
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('usuarios');
        const findResult = await collection.find({}).toArray();
        collection.listIndexes
        findResult.forEach(e => usuarios.push(new UserApp(e.nombre, e.apellido, e.dni, e.password, e.depto, e.email, e.reservas)));
        await this.conectarMongodb.desconectar();
        return Promise.resolve(usuarios);
    }

    // si no encuentra un vehiculo, devuelve un objeto vacio
    async get(clave: string): Promise<UserApp> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('usuarios');
        const findResult = await collection.findOne({ patente: clave });
        await this.conectarMongodb.desconectar();
        const usuario = new UserApp("", "", "", "", 0, "", []);
        if (findResult !== null) {
            usuario.dni = findResult.dni;
        }
        return Promise.resolve(usuario);
    }

    async delete(element: UserApp): Promise<boolean> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('usuarios');
        const findResult = await collection.deleteOne({ dni: element.dni });
        await this.conectarMongodb.desconectar();
        let rta = false;
        if (findResult.deletedCount > 0) {
            rta = true;
        }
        console.log("Estado de rta " + rta);

        return Promise.resolve(rta);
    }
}

export { UserAppDaoMongodb }