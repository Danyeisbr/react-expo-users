import { render } from "@testing-library/react-native";
import type { User } from "@types/index";
import UserCard from "../UserCard";

const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  username: "johndoe",
  website: "johndoe.com",
  address: {
    street: "123 Main St",
    suite: "Apt 1",
    city: "New York",
    zipcode: "10001",
  },
  company: {
    name: "Test Company",
    catchPhrase: "Test catch phrase",
    bs: "Test bs",
  },
};

describe("UserCard", () => {
  it("renders user information correctly", () => {
    const { getByText } = render(<UserCard user={mockUser} />);

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("john@example.com")).toBeTruthy();
  });
});
