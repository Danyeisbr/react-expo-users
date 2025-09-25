import { render, screen } from "@testing-library/react-native";
import React from "react";
import { User } from "../../../types/shared-types";
import { AddressCard } from "./AddressCard";

jest.mock("../../../store/themeStore", () => ({
  useThemeStore: jest.fn(() => ({ effective: "light" })),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(component);
};

const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  username: "johndoe",
  website: "johndoe.com",
  address: {
    street: "123 Main St",
    suite: "Apt 1",
    city: "New York",
    zipcode: "10001",
    geo: {
      lat: "40.7128",
      lng: "-74.0060",
    },
  },
  company: {
    name: "Acme Corp",
    catchPhrase: "Making things happen",
    bs: "enterprise solutions",
  },
};

describe("AddressCard", () => {
  it("should render address section title and address details", () => {
    renderWithProviders(<AddressCard user={mockUser} isDark={false} />);

    expect(screen.getByText("Address")).toBeTruthy();
    expect(screen.getByText("123 Main St, Apt 1")).toBeTruthy();
    expect(screen.getByText("New York 10001")).toBeTruthy();
  });

  it("should render with light theme", () => {
    renderWithProviders(<AddressCard user={mockUser} isDark={false} />);

    expect(screen.getByText("Address")).toBeTruthy();
    expect(screen.getByText("123 Main St, Apt 1")).toBeTruthy();
    expect(screen.getByText("New York 10001")).toBeTruthy();
  });

  it("should render with dark theme", () => {
    renderWithProviders(<AddressCard user={mockUser} isDark={true} />);

    expect(screen.getByText("Address")).toBeTruthy();
    expect(screen.getByText("123 Main St, Apt 1")).toBeTruthy();
    expect(screen.getByText("New York 10001")).toBeTruthy();
  });

  it("should render different addresses correctly", () => {
    const userWithDifferentAddress: User = {
      ...mockUser,
      address: {
        street: "456 Oak Ave",
        suite: "Suite 200",
        city: "Los Angeles",
        zipcode: "90210",
        geo: {
          lat: "34.0522",
          lng: "-118.2437",
        },
      },
    };

    renderWithProviders(
      <AddressCard user={userWithDifferentAddress} isDark={false} />
    );

    expect(screen.getByText("Address")).toBeTruthy();
    expect(screen.getByText("456 Oak Ave, Suite 200")).toBeTruthy();
    expect(screen.getByText("Los Angeles 90210")).toBeTruthy();
  });

  it("should handle addresses without suite", () => {
    const userWithoutSuite: User = {
      ...mockUser,
      address: {
        street: "789 Pine St",
        suite: "",
        city: "Chicago",
        zipcode: "60601",
        geo: {
          lat: "41.8781",
          lng: "-87.6298",
        },
      },
    };

    renderWithProviders(<AddressCard user={userWithoutSuite} isDark={false} />);

    expect(screen.getByText("789 Pine St, ")).toBeTruthy();
    expect(screen.getByText("Chicago 60601")).toBeTruthy();
  });

  it("should handle long addresses gracefully", () => {
    const userWithLongAddress: User = {
      ...mockUser,
      address: {
        street:
          "Very Long Street Name That Might Cause Layout Issues In The User Interface",
        suite: "Very Long Suite Name That Might Also Cause Issues",
        city: "Very Long City Name That Could Cause Problems",
        zipcode: "12345-6789",
        geo: {
          lat: "40.7128",
          lng: "-74.0060",
        },
      },
    };

    renderWithProviders(
      <AddressCard user={userWithLongAddress} isDark={false} />
    );

    expect(screen.getByText("Address")).toBeTruthy();
    expect(
      screen.getByText(
        "Very Long Street Name That Might Cause Layout Issues In The User Interface, Very Long Suite Name That Might Also Cause Issues"
      )
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Very Long City Name That Could Cause Problems 12345-6789"
      )
    ).toBeTruthy();
  });
});
