import { ReservaDaoMongodb } from "../../repository/ReservaDaoMongodb.js";

async function reservaDao() {
    const reservaDao = new ReservaDaoMongodb()
    await reservaDao.add({
        amenity: undefined,
        estado: 1,
        fecha: 1,
        id: 3
      })
    await reservaDao.delete(3)
    const all = await reservaDao.getAll()
    
    return all;
}

console.log()
console.log(await reservaDao())


