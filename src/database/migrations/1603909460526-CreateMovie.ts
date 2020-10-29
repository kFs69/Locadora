import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMovie1603909460526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'movies',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()'
                },
                {
                  name: 'title',
                  type: 'varchar',
                },
                {
                  name: 'director',
                  type: 'varchar',
                },
                {
                  name: 'available',
                  type: 'smallint',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movies');
    }

}
