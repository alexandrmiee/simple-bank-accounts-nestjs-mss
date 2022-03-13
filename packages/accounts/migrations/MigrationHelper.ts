const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);
const quote = (text: string) => `"${text}"`;

export const pkName = (tableName: string, columns: string[]) => {
  return quote(`PK_${upperFirst(tableName)}_${columns.map(lowerFirst).join('_')}`);
};
export const fkName = (tableName: string, columns: string[], targetTableName: string, targetColumns: string[]) => {
  return quote(
    `FK_${upperFirst(tableName)}_${columns.map(lowerFirst).join('_')}_${upperFirst(
      targetTableName,
    )}_${targetColumns.map(lowerFirst).join('_')}`,
  );
};
export const uqName = (tableName: string, columns: string[]) => {
  return quote(`UQ_${upperFirst(tableName)}_${columns.map(lowerFirst).join('_')}`);
};

export const addPK = (tableName: string, columns: string[]) => {
  return `CONSTRAINT ${pkName(tableName, columns)} PRIMARY KEY (${columns.map(quote).join(', ')})`;
};
export const addFK = (tableName: string, columns: string[], targetTableName: string, targetColumns: string[]) => {
  return (
    `CONSTRAINT ${fkName(tableName, columns, targetTableName, targetColumns)} ` +
    `FOREIGN KEY (${columns.map(quote).join(', ')}) REFERENCES ${quote(
      upperFirst(targetTableName),
    )} (${targetColumns.map(quote).join(', ')})`
  );
};
export const addUQ = (tableName: string, columns: string[]) => {
  return `CONSTRAINT ${uqName(tableName, columns)} UNIQUE (${columns.map(quote).join(', ')})`;
};
export const addIX = (tableName: string, columns: string[]) => {
  return `CONSTRAINT ${uqName(tableName, columns)} UNIQUE (${columns.map(quote).join(', ')})`;
};

export const dropPK = (tableName: string, columns: string[]) => {
  return `DROP CONSTRAINT ${pkName(tableName, columns)}`;
};

export const dropFK = (tableName: string, columns: string[], targetTableName: string, targetColumns: string[]) => {
  return `DROP CONSTRAINT ${fkName(tableName, columns, targetTableName, targetColumns)}`;
};

export const dropUQ = (tableName: string, columns: string[]) => {
  return `DROP CONSTRAINT ${uqName(tableName, columns)}`;
};
