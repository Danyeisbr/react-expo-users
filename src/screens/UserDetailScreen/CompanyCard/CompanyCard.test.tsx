import { render, screen } from "@testing-library/react-native";
import React from "react";
import { User } from "../../../types/shared-types";
import { CompanyCard } from "./CompanyCard";

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

describe("CompanyCard", () => {
  it("should render company section title, name and catch phrase", () => {
    renderWithProviders(<CompanyCard user={mockUser} isDark={false} />);

    expect(screen.getByText("Company")).toBeTruthy();
    expect(screen.getByText("Acme Corp")).toBeTruthy();
    expect(screen.getByText("Making things happen")).toBeTruthy();
  });

  it("should render with light theme", () => {
    renderWithProviders(<CompanyCard user={mockUser} isDark={false} />);

    expect(screen.getByText("Company")).toBeTruthy();
    expect(screen.getByText("Acme Corp")).toBeTruthy();
    expect(screen.getByText("Making things happen")).toBeTruthy();
  });

  it("should render with dark theme", () => {
    renderWithProviders(<CompanyCard user={mockUser} isDark={true} />);

    expect(screen.getByText("Company")).toBeTruthy();
    expect(screen.getByText("Acme Corp")).toBeTruthy();
    expect(screen.getByText("Making things happen")).toBeTruthy();
  });

  it("should render different company data correctly", () => {
    const userWithDifferentCompany: User = {
      ...mockUser,
      company: {
        name: "Tech Solutions Inc",
        catchPhrase: "Innovation at its finest",
        bs: "cutting-edge technology",
      },
    };

    renderWithProviders(
      <CompanyCard user={userWithDifferentCompany} isDark={false} />
    );

    expect(screen.getByText("Company")).toBeTruthy();
    expect(screen.getByText("Tech Solutions Inc")).toBeTruthy();
    expect(screen.getByText("Innovation at its finest")).toBeTruthy();
    expect(screen.queryByText("Acme Corp")).toBeNull();
  });

  it("should handle long company names gracefully", () => {
    const userWithLongCompanyName: User = {
      ...mockUser,
      company: {
        name: "Very Long Company Name That Might Cause Layout Issues In The User Interface",
        catchPhrase: "Making things happen",
        bs: "enterprise solutions",
      },
    };

    renderWithProviders(
      <CompanyCard user={userWithLongCompanyName} isDark={false} />
    );

    expect(screen.getByText("Company")).toBeTruthy();
    expect(
      screen.getByText(
        "Very Long Company Name That Might Cause Layout Issues In The User Interface"
      )
    ).toBeTruthy();
    expect(screen.getByText("Making things happen")).toBeTruthy();
  });

  it("should handle long catch phrases gracefully", () => {
    const userWithLongCatchPhrase: User = {
      ...mockUser,
      company: {
        name: "Acme Corp",
        catchPhrase:
          "Very Long Catch Phrase That Might Cause Layout Issues In The User Interface And Could Potentially Break The Design",
        bs: "enterprise solutions",
      },
    };

    renderWithProviders(
      <CompanyCard user={userWithLongCatchPhrase} isDark={false} />
    );

    expect(screen.getByText("Company")).toBeTruthy();
    expect(screen.getByText("Acme Corp")).toBeTruthy();
    expect(
      screen.getByText(
        "Very Long Catch Phrase That Might Cause Layout Issues In The User Interface And Could Potentially Break The Design"
      )
    ).toBeTruthy();
  });

  it("should handle empty catch phrases", () => {
    const userWithEmptyCatchPhrase: User = {
      ...mockUser,
      company: {
        name: "Acme Corp",
        catchPhrase: "",
        bs: "enterprise solutions",
      },
    };

    renderWithProviders(
      <CompanyCard user={userWithEmptyCatchPhrase} isDark={false} />
    );

    expect(screen.getByText("Company")).toBeTruthy();
    expect(screen.getByText("Acme Corp")).toBeTruthy();
    expect(screen.getByText("")).toBeTruthy();
  });
});
