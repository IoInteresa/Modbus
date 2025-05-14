exports.up = function (knex) {
  return knex.schema
    .createTable("plcs", function (table) {
      table.increments("id").primary();
      table.string("ip").notNullable();
      table.integer("port").notNullable();
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
        .notNullable()
        .references("id")
        .inTable("machines")
        .onDelete("RESTRICT");
      table
        .integer("plcId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("plcs")
        .onDelete("RESTRICT");
      table.integer("plcInput").notNullable();
    })
    .createTable("signalCalls", function (table) {
      table
        .integer("signalId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("signals")
        .onDelete("RESTRICT");
      table
        .integer("count")
        .notNullable()
        .defaultTo(3);
      table.date("date").notNullable()

      table.primary(["signalId", "date"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("signalCalls")
    .dropTableIfExists("signals")
    .dropTableIfExists("machines")
    .dropTableIfExists("plcs");
};
