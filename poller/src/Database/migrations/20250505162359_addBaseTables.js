exports.up = function (knex) {
  return knex.schema
    .createTable("plcs", function (table) {
      table.increments("id").primary();
      table.string("ip").notNullable().unique();
    })
    .createTable("machines", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
    })
    .createTable("signals", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table
        .integer("machineId")
        .unsigned()
        .references("id")
        .inTable("machines");
      table.integer("plcId").unsigned().references("id").inTable("plcs");
      table.integer("plcInput").notNullable();
    })
    .createTable("signalCalls", function (table) {
      table.integer("signalId").unsigned().references("id").inTable("signals");
      table.integer("count").notNullable().defaultTo(1);
      table.date("date").notNullable().defaultTo(knex.fn.now());

      table.primary(["signalId", "date"]);
      table.unique(["signalId", "date"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("signalCalls")
    .dropTableIfExists("signals")
    .dropTableIfExists("machines")
    .dropTableIfExists("plcs");
};
