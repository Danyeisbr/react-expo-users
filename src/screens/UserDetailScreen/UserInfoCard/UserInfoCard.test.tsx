import { render, screen } from "@testing-library/react-native";
import React from "react";
import { User } from "../../../types/shared-types";
import { UserInfoCard } from "./UserInfoCard";

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

describe("UserInfoCard", () => {
  it("should render user name and email", () => {
    renderWithProviders(<UserInfoCard user={mockUser} isDark={false} />);

    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("john.doe@example.com")).toBeTruthy();
  });

  it("should render with light theme", () => {
    renderWithProviders(<UserInfoCard user={mockUser} isDark={false} />);

    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("john.doe@example.com")).toBeTruthy();
  });

  it("should render with dark theme", () => {
    renderWithProviders(<UserInfoCard user={mockUser} isDark={true} />);

    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("john.doe@example.com")).toBeTruthy();
  });

  it("should render different user data correctly", () => {
    const anotherUser: User = {
      ...mockUser,
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
    };

    renderWithProviders(<UserInfoCard user={anotherUser} isDark={false} />);

    expect(screen.getByText("Jane Smith")).toBeTruthy();
    expect(screen.getByText("jane.smith@example.com")).toBeTruthy();
    expect(screen.queryByText("John Doe")).toBeNull();
  });

  it("should handle long names gracefully", () => {
    const userWithLongName: User = {
      ...mockUser,
      name: "Very Long Name That Might Cause Layout Issues In The User Interface",
    };

    renderWithProviders(
      <UserInfoCard user={userWithLongName} isDark={false} />
    );

    expect(
      screen.getByText(
        "Very Long Name That Might Cause Layout Issues In The User Interface"
      )
    ).toBeTruthy();
  });

  it("should handle long emails gracefully", () => {
    const userWithLongEmail: User = {
      ...mockUser,
      email:
        "very.long.email.address.that.might.cause.issues@verylongdomainname.com",
    };

    renderWithProviders(
      <UserInfoCard user={userWithLongEmail} isDark={false} />
    );

    expect(
      screen.getByText(
        "very.long.email.address.that.might.cause.issues@verylongdomainname.com"
      )
    ).toBeTruthy();
  });
});
