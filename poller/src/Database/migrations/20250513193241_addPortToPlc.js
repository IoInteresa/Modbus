exports.up = function (knex) {
  return knex.schema.table("plcs", function (table) {
    table.integer("port").notNullable().defaultTo(502);
  });
};

exports.down = function (knex) {
  return knex.schema.table("plcs", function (table) {
    table.dropColumn("port");
  });
};
