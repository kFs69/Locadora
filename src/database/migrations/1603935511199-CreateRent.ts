import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateRent1603935511199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'rents',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()'
                },
                {
                  name: 'status',
                  type: 'varchar'
                },
                {
                  name: 'user_id',
                  type: 'uuid',
                  isNullable: true
                },
                {
                  name: 'movie_id',
                  type: 'uuid',
                  isNullable: true
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()'
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()'
                }
              ]
            })
          )
          await queryRunner.createForeignKey('rents', new TableForeignKey({
            name: 'RentUserId',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }))
          await queryRunner.createForeignKey('rents', new TableForeignKey({
              name: 'RentMovieId',
              columnNames: ['movie_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'movies',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
          }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('rents', 'RentUserId');
      await queryRunner.dropForeignKey('rents', 'RentMovieId');
      await queryRunner.dropTable('rents');
    }

}
