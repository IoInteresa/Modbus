exports.up = function (knex) {
  return knex.schema.table("plcs", function (table) {
    table.dropUnique("ip");
  });
};

exports.down = function (knex) {
  return knex.schema.table("plcs", function (table) {
    table.unique("ip");
  });
};
