import { NotFoundException } from "@nestjs/common"
import { EntityTarget, getConnection } from "typeorm"

export default async function transactionalUpdate<T>(entityClass: EntityTarget<T>, entity: T, organizationId: string, ): Promise<T>{
    const conn = getConnection()
    const qr = conn.createQueryRunner()
    await qr.connect()
    try {
      await qr.startTransaction()
      const foundRole = await qr.manager.findOne<T>(entityClass, entity['id'], {where: {organization: {id: organizationId}}})
      if(foundRole){
        await qr.manager.save<T>(entity);
        const savedEntity =  await qr.manager.findOne<T>(entityClass, entity['id'], {where: {organization: {id : organizationId}}});
        await qr.commitTransaction();
        await qr.release();
        return savedEntity
      } else{
        throw new NotFoundException()
      }
    } catch (error) {
      await qr.rollbackTransaction();
      await qr.release()
      throw error
    }
}