/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.addColumns("leads", {
    first_name: { type: "text" },
    last_name: { type: "text" },
    company: { type: "text" },
    job_title: { type: "text" },
    phone: { type: "text" },
    marketing_opt_in: { type: "boolean", default: false },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropColumns("leads", [
    "first_name",
    "last_name",
    "company",
    "job_title",
    "phone",
    "marketing_opt_in",
  ]);
};
