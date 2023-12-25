import { Menu } from "./Menu";
import { render, screen } from "@testing-library/react";

describe("Test menu component", () => {
  test("Test rendering", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          name: "大饼",
          description: "用面团烘烤而成的干点",
          price: 2.6,
        },
        {
          name: "油条",
          description: "油炸的细长面团",
          price: 3.5,
        },
        {
          name: "粢饭团",
          description: "一种糯米包油条的特色小吃",
          price: 3.2,
        },
        {
          name: "豆浆",
          description: "黄豆磨成粉末加水煮成的一种饮料",
          price: 2.9,
        },
      ],
    });

    render(<Menu />);

    const listElements = await screen.findAllByRole("listitem");
    expect(listElements).not.toHaveLength(0);

    const textElement = screen.getByText("30欧", { exact: false });
    expect(textElement).toBeInTheDocument();
  });
});