const API_URL = process.env.REACT_APP_API_URL || "https://c323-180-244-133-234.ngrok-free.app";

/**
 * Fungsi untuk upload file
 */
export const uploadFiles = async (dosen_file: File, jadwal_file: File) => {
  try {
    const formData = new FormData();
    formData.append("dosen_file", dosen_file);
    formData.append("jadwal_file", jadwal_file);

    const response = await fetch(`${API_URL}/api/v1/schedule`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload files: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error uploading files:", error.message);

    if (error.name === "TypeError") {
      throw new Error("Network error: Unable to reach the server. Please check your connection.");
    }

    if (error.message.includes("Failed to upload files")) {
      throw new Error("There was an error with the file upload. Please check the file format or try again.");
    }

    throw error;
  }
};

/**
 * Fungsi untuk mengambil semua jadwal
 */
export const getSchedules = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/schedules`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

    const text = await response.text(); // Respon mentah

    if (!response.ok) {
      throw new Error(`Failed to fetch schedules: ${text}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON response");
    }

    return JSON.parse(text); // Jika server tetap mengembalikan JSON tanpa header
  } catch (error: any) {
    console.error("Error fetching schedules:", error.message);
    throw error;
  }
};

/**
 * Fungsi untuk mengambil jadwal berdasarkan ID
 */
export const getScheduleById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/schedules/${id}`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch schedule with ID ${id}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Error fetching schedule with ID ${id}:`, error.message);

    if (error.name === "TypeError") {
      throw new Error("Network error: Unable to reach the server. Please check your connection.");
    }

    throw error;
  }
};
