import { normalizeToSearch } from "./string.util";

describe('StringUtils', () => {

  it('should normalize a string to search', () => {
    let normalized = normalizeToSearch('Esta cadena se normalizó, sin mayúsculas ni acentos');
    expect(normalized).toEqual('esta cadena se normalizo, sin mayusculas ni acentos');
  });

});
