import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { User } from "../../types/shared-types";
import UserCard from "./UserCard";

jest.mock("../../store/themeStore", () => ({
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

describe("UserCard", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it("should render user name and email", () => {
    renderWithProviders(<UserCard user={mockUser} onPress={mockOnPress} />);

    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("john.doe@example.com")).toBeTruthy();
  });

  it("should render user avatar with correct source", () => {
    renderWithProviders(<UserCard user={mockUser} onPress={mockOnPress} />);

    const avatar = screen.getByLabelText("John Doe avatar");
    expect(avatar).toBeTruthy();
    expect(avatar.props.source.uri).toBe("https://picsum.photos/seed/1/200");
  });

  it("should render chevron icon", () => {
    renderWithProviders(<UserCard user={mockUser} onPress={mockOnPress} />);

    expect(screen.getByText("›")).toBeTruthy();
  });

  it("should call onPress when card is pressed", () => {
    renderWithProviders(<UserCard user={mockUser} onPress={mockOnPress} />);

    const card = screen.getByText("John Doe").parent;
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("should call onPress with correct user data", () => {
    renderWithProviders(<UserCard user={mockUser} onPress={mockOnPress} />);

    const card = screen.getByText("John Doe").parent;
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalled();
  });

  it("should handle multiple presses", () => {
    renderWithProviders(<UserCard user={mockUser} onPress={mockOnPress} />);

    const card = screen.getByText("John Doe").parent;
    fireEvent.press(card);
    fireEvent.press(card);
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalledTimes(3);
  });

  it("should render different user data correctly", () => {
    const anotherUser: User = {
      ...mockUser,
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
    };

    renderWithProviders(<UserCard user={anotherUser} onPress={mockOnPress} />);

    expect(screen.getByText("Jane Smith")).toBeTruthy();
    expect(screen.getByText("jane.smith@example.com")).toBeTruthy();
    expect(screen.queryByText("John Doe")).toBeNull();
  });

  it("should render avatar with correct ID for different users", () => {
    const userWithId2: User = {
      ...mockUser,
      id: 2,
    };

    renderWithProviders(<UserCard user={userWithId2} onPress={mockOnPress} />);

    const avatar = screen.getByLabelText("John Doe avatar");
    expect(avatar.props.source.uri).toBe("https://picsum.photos/seed/2/200");
  });

  it("should have correct accessibility properties", () => {
    renderWithProviders(<UserCard user={mockUser} onPress={mockOnPress} />);

    const avatar = screen.getByLabelText("John Doe avatar");
    expect(avatar).toBeTruthy();
    expect(avatar.props.accessibilityLabel).toBe("John Doe avatar");
  });

  it("should handle long names gracefully", () => {
    const userWithLongName: User = {
      ...mockUser,
      name: "Very Long Name That Might Cause Layout Issues In The User Interface",
    };

    renderWithProviders(
      <UserCard user={userWithLongName} onPress={mockOnPress} />
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
      <UserCard user={userWithLongEmail} onPress={mockOnPress} />
    );

    expect(
      screen.getByText(
        "very.long.email.address.that.might.cause.issues@verylongdomainname.com"
      )
    ).toBeTruthy();
  });

  it("should maintain consistent layout with different content lengths", () => {
    const shortUser: User = {
      ...mockUser,
      name: "A",
      email: "a@b.co",
    };

    const { rerender } = renderWithProviders(
      <UserCard user={shortUser} onPress={mockOnPress} />
    );

    expect(screen.getByText("A")).toBeTruthy();
    expect(screen.getByText("a@b.co")).toBeTruthy();

    rerender(<UserCard user={mockUser} onPress={mockOnPress} />);

    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("john.doe@example.com")).toBeTruthy();
  });

  it("should not crash when onPress is not provided", () => {
    expect(() => {
      renderWithProviders(
        <UserCard user={mockUser} onPress={undefined as any} />
      );
    }).not.toThrow();
  });
});
