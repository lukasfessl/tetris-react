
class ColorResolver {

    // GOLD, GREEN, BLUE, RED, PURPLE, ORANGE, MAROON, PINK
    // https://www.rapidtables.com/web/color/pink-color.html
    static colorMap = { 
        10: "#FFD700", 11: "#228B22", 12: "#E9967A", 13: "#DDA0DD", 14: "#FF7F50", 15: "#800000", 16: "#C71585", 17: "#B0E0E6",
        20: "#DAA520", 21: "#008000", 22: "#CD5C5C", 23: "#DA70D6", 24: "#FF6347", 25: "#8B0000", 26: "#FF69B4", 27: "#87CEFA",
        30: "#FFA500", 31: "#006400", 32: "#B22222", 33: "#BA55D3", 34: "#FF4500", 35: "#800000", 36: "#C71585", 37: "#00BFFF",
        40: "#FF8C00", 41: "#32CD32", 42: "#8B0000", 43: "#9370DB", 44: "#FFD700", 45: "#8B0000", 46: "#FF69B4", 47: "#B0C4DE",
        50: "#D2691E", 51: "#808000", 52: "#FFA07A", 53: "#800080", 54: "#FF8C00", 55: "#B22222", 56: "#FF69B4", 57: "#7B68EE",
        60: "#8B4513", 61: "#556B2F", 62: "#E9967A", 63: "#8B008B", 64: "#FF6347", 65: "#A52A2A", 66: "#C71585", 67: "#4169E1",
        70: "#A0522D", 71: "#6B8E23", 72: "#FF6347", 73: "#EE82EE", 74: "#FF7F50", 75: "#DC143C", 76: "#DB7093", 77: "#000080",
    };    

    static resolve(index) {
        return this.colorMap[index];
    }

}

export default ColorResolver;