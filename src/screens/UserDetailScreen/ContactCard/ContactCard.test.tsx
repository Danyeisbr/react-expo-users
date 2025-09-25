import { render, screen } from "@testing-library/react-native";
import React from "react";
import { User } from "../../../types/shared-types";
import { ContactCard } from "./ContactCard";

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

describe("ContactCard", () => {
  it("should render phone section title and phone number", () => {
    renderWithProviders(<ContactCard user={mockUser} isDark={false} />);

    expect(screen.getByText("Phone")).toBeTruthy();
    expect(screen.getByText("+1 234 567 8900")).toBeTruthy();
  });

  it("should render with light theme", () => {
    renderWithProviders(<ContactCard user={mockUser} isDark={false} />);

    expect(screen.getByText("Phone")).toBeTruthy();
    expect(screen.getByText("+1 234 567 8900")).toBeTruthy();
  });

  it("should render with dark theme", () => {
    renderWithProviders(<ContactCard user={mockUser} isDark={true} />);

    expect(screen.getByText("Phone")).toBeTruthy();
    expect(screen.getByText("+1 234 567 8900")).toBeTruthy();
  });

  it("should render different phone numbers correctly", () => {
    const userWithDifferentPhone: User = {
      ...mockUser,
      phone: "+1 555 123 4567",
    };

    renderWithProviders(
      <ContactCard user={userWithDifferentPhone} isDark={false} />
    );

    expect(screen.getByText("Phone")).toBeTruthy();
    expect(screen.getByText("+1 555 123 4567")).toBeTruthy();
    expect(screen.queryByText("+1 234 567 8900")).toBeNull();
  });

  it("should handle international phone numbers", () => {
    const userWithIntlPhone: User = {
      ...mockUser,
      phone: "+44 20 7946 0958",
    };

    renderWithProviders(
      <ContactCard user={userWithIntlPhone} isDark={false} />
    );

    expect(screen.getByText("+44 20 7946 0958")).toBeTruthy();
  });

  it("should handle long phone numbers", () => {
    const userWithLongPhone: User = {
      ...mockUser,
      phone: "+1 234 567 8900 ext 12345",
    };

    renderWithProviders(
      <ContactCard user={userWithLongPhone} isDark={false} />
    );

    expect(screen.getByText("+1 234 567 8900 ext 12345")).toBeTruthy();
  });
});
