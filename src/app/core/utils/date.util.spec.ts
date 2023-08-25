import { parseDateToInputFormat } from "./date.util";

describe('DateUtils', () => {

  let date1: Date = new Date(2023,8,7);
  let date2: Date = new Date(2023,10,17);

  it('should parse date from yyyy-M-d to yyyy-MM-dd format', () => {
    let parsed = parseDateToInputFormat(date1);
    expect(parsed).toEqual('2023-09-07');
  });
  
  it('should parse date from yyyy-MM-dd to yyyy-MM-dd format', () => {
    let parsed = parseDateToInputFormat(date2);
    expect(parsed).toEqual('2023-11-17');
  });

});
