from PIL import Image, ImageDraw
import math
import random
import os


class HexGridGenerator:
    def __init__(self, theme="light", icon_folder=f"icons", icon_probability=1, scale=4, size=1024):
        self.theme = theme
        self.icon_folder = f"{icon_folder}/{self.theme}" 
        self.icon_probability = icon_probability
        self.scale = scale
        self.width = size * scale
        self.height = size * scale
        self.hex_size = 30 * scale
        self.icons = self.load_icons()
        self.is_light = theme == "light"
        self.bg_color = "white" if self.is_light else (20, 20, 20)
        self.outline_color = (100, 100, 100) if self.is_light else (200, 200, 200)
        self.image = Image.new("RGB", (self.width, self.height), self.bg_color)
        self.draw = ImageDraw.Draw(self.image)

    def load_icons(self):
        files = [f for f in os.listdir(self.icon_folder) if f.lower().endswith(".png")]
        return [Image.open(os.path.join(self.icon_folder, f)).convert("RGBA") for f in files]

    def pastel_color(self):
        if self.is_light:
            return tuple(random.randint(180, 255) for _ in range(3))
        return tuple(random.randint(50, 100) for _ in range(3))

    def draw_hexagon(self, center_x, center_y, size, fill_color):
        points = []
        for i in range(6):
            angle_deg = 60 * i - 30
            angle_rad = math.radians(angle_deg)
            x = center_x + size * math.cos(angle_rad)
            y = center_y + size * math.sin(angle_rad)
            points.append((x, y))
        self.draw.polygon(points, fill=fill_color, outline=self.outline_color)

    def paste_icon(self, icon, center_x, center_y, target_size):
        icon = icon.resize((target_size, target_size), Image.LANCZOS)
        position = (int(center_x - icon.width / 2), int(center_y - icon.height / 2))
        self.image.paste(icon, position, icon)

    def generate_grid(self):
        step_y = int(self.hex_size * 1.5)
        step_x = int(self.hex_size * math.sqrt(3))

        for y in range(0, self.height + step_y, step_y):
            for x in range(0, self.width + step_x, step_x):
                offset_x = step_x // 2 if (y // step_y) % 2 else 0
                cx = x + offset_x
                cy = y
                fill = self.pastel_color()
                self.draw_hexagon(cx, cy, self.hex_size, fill)

                if random.random() < self.icon_probability and self.icons:
                    icon = random.choice(self.icons)
                    self.paste_icon(icon, cx, cy, target_size=int(self.hex_size * 1.2))

    def scale_image(self):
        final_image = self.image.resize((self.width // self.scale, self.height // self.scale), resample=Image.LANCZOS)
        
        return final_image


if __name__ == "__main__":
    grid = HexGridGenerator(theme="dark")
    grid.generate_grid()
    grid.scale_image()
