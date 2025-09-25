export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: Address;
  company: Company;
  username: string;
  website: string;
};

export * from "./component-types";
export * from "./hooks-types";
export * from "./navigation-types";
export * from "./services-types";
export * from "./stores-types";
export * from "./styled-components-types";
