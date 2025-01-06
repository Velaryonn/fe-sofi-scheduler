import React, { useState, useEffect } from "react";
import { getSchedules } from "../services/apiServices";
import BarChart from "./BarChart";

const Overview: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<{
    total_schedule: number;
    total_dosen: number;
    avg_dosen: number;
    unique_fields: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk memuat data dari API
  const initializeSchedule = async () => {
    setLoading(true);
    try {
      const response = await getSchedules(); // Ambil data dari API
      if (response && response.length > 0) {
        const latestData = response[response.length - 1]?.schedule || null;
        setScheduleData(latestData);
      } else {
        console.warn("No schedules available in the response");
        setScheduleData(null);
      }
    } catch (error: any) {
      console.error("Error fetching schedule:", error);
      setError(error.message || "Error fetching schedule");
    } finally {
      setLoading(false);
    }
  };

  // Panggil `initializeSchedule` saat komponen pertama kali dirender
  useEffect(() => {
    initializeSchedule();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : scheduleData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-4/5 lg:w-2/3 mb-20 mt-10">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-8 w-full h-[300px] max-w-[500px] flex flex-col justify-between relative">
            <div className="flex items-center">
              <div className="bg-gray-200 w-40 h-40 rounded-md mr-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="170" viewBox="0 0 483 453" fill="none">
                  <ellipse cx="157.5" cy="136.5" rx="97.5" ry="86.5" fill="#D9D9D9" />
                  <path d="M422 136.5C422 182.288 380.039 220 327.5 220C274.961 220 233 182.288 233 136.5C233 90.7117 274.961 53 327.5 53C380.039 53 422 90.7117 422 136.5Z" fill="#D9D9D9" stroke="black" strokeWidth="6" />
                  <path
                    d="M79.0456 90.1944C80.2575 89.0647 80.3242 87.1664 79.1944 85.9544C78.0647 84.7425 76.1664 84.6758 74.9544 85.8056L79.0456 90.1944ZM66.3363 165.252C64.1454 156.742 62.1561 142.642 63.3675 128.253C64.5831 113.814 68.9744 99.5826 79.0456 90.1944L74.9544 85.8056C63.3153 96.6552 58.6607 112.64 57.3886 127.75C56.1124 142.909 58.1937 157.69 60.5258 166.748L66.3363 165.252Z"
                    fill="black"
                  />
                  <path d="M352.5 425.731H132C132 413.231 132 329.231 242 323.231C330 318.431 352.333 389.565 352.5 425.731Z" fill="#007AFF" />
                  <path
                    d="M236.27 376.917L212.878 343.098C209.68 338.475 212.962 332.158 218.583 332.116L264.865 331.774C270.486 331.732 273.861 338 270.732 342.67L247.843 376.832C245.095 380.933 239.079 380.977 236.27 376.917Z"
                    fill="#D9D9D9"
                    stroke="black"
                    strokeWidth="6"
                  />
                  <path
                    d="M100 189.5C100 198.196 97.4704 205.943 93.5318 211.441C89.5895 216.944 84.4111 220 79 220C73.5889 220 68.4105 216.944 64.4682 211.441C60.5296 205.943 58 198.196 58 189.5C58 180.804 60.5296 173.057 64.4682 167.559C68.4105 162.056 73.5889 159 79 159C84.4111 159 89.5895 162.056 93.5318 167.559C97.4704 173.057 100 180.804 100 189.5Z"
                    fill="#FFDDCC"
                    stroke="black"
                    strokeWidth="6"
                  />
                  <path
                    d="M422 189.5C422 198.196 419.47 205.943 415.532 211.441C411.589 216.944 406.411 220 401 220C395.589 220 390.411 216.944 386.468 211.441C382.53 205.943 380 198.196 380 189.5C380 180.804 382.53 173.057 386.468 167.559C390.411 162.056 395.589 159 401 159C406.411 159 411.589 162.056 415.532 167.559C419.47 173.057 422 180.804 422 189.5Z"
                    fill="#FFDDCC"
                    stroke="black"
                    strokeWidth="6"
                  />
                  <circle cx="242" cy="182" r="149" fill="#FFDDCC" stroke="black" strokeWidth="6" />
                  <ellipse cx="158" cy="205" rx="30" ry="23" fill="#FAA3AB" />
                  <ellipse cx="328" cy="205" rx="30" ry="23" fill="#FAA3AB" />
                  <path d="M166 238.09C206.8 262.89 235 244.424 244 232.09C272.4 265.69 304.833 246.09 317.5 232.09C299.5 172.89 261 179.423 244 190.09C197.2 162.89 172.5 210.757 166 238.09Z" fill="#BDBAC1" stroke="black" strokeWidth="6" />
                  <ellipse cx="311" cy="172" rx="7" ry="10" fill="black" />
                  <ellipse cx="173" cy="172" rx="7" ry="10" fill="black" />
                  <path d="M307 333C305 281 267.166 311.333 248.5 333H233.5C214.833 313.833 177.2 287 176 333C174.8 379 213.833 358.833 233.5 343H248.5C268.833 361.333 309 385 307 333Z" fill="#F24C5B" stroke="black" strokeWidth="6" />
                  <path
                    d="M260 334C260 337.283 258.261 340.467 255.031 342.927C251.799 345.39 247.201 347 242 347C236.799 347 232.201 345.39 228.969 342.927C225.739 340.467 224 337.283 224 334C224 330.717 225.739 327.533 228.969 325.073C232.201 322.61 236.799 321 242 321C247.201 321 251.799 322.61 255.031 325.073C258.261 327.533 260 330.717 260 334Z"
                    fill="#F24C5B"
                    stroke="black"
                    strokeWidth="6"
                  />
                  <path
                    d="M130.5 426L127.572 426.654L128.096 429H130.5V426ZM166 426V429H168.273L168.888 426.812L166 426ZM175 394H178L172.112 393.188L175 394ZM175 426H172V429H175V426ZM302.5 426V429H304.842L305.41 426.728L302.5 426ZM310.5 394H313.5L307.59 393.272L310.5 394ZM310.5 426H307.5V429H310.5V426ZM355.5 426V429H358.66L358.496 425.844L355.5 426ZM347.882 382.633C346.299 382.145 344.62 383.034 344.133 384.618C343.645 386.201 344.534 387.88 346.118 388.367L347.882 382.633ZM173.316 334.018C163.696 340.545 149.961 352.903 139.768 368.941C129.567 384.992 122.741 405.018 127.572 426.654L133.428 425.346C129.059 405.782 135.15 387.392 144.832 372.159C154.522 356.913 167.638 345.121 176.685 338.982L173.316 334.018ZM130.5 429H166V423H130.5V429ZM168.888 426.812L177.888 394.812L172.112 393.188L163.112 425.188L168.888 426.812ZM172 394V426H178V394H172ZM175 429H302.5V423H175V429ZM305.41 426.728L313.41 394.728L307.59 393.272L299.59 425.272L305.41 426.728ZM307.5 394V426H313.5V394H307.5ZM310.5 429H355.5V423H310.5V429ZM358.496 425.844C358.159 419.359 357.326 409.513 355.909 401.043C355.203 396.824 354.333 392.824 353.265 389.721C352.733 388.178 352.109 386.729 351.357 385.555C350.653 384.456 349.551 383.146 347.882 382.633L346.118 388.367C345.749 388.254 345.867 388.108 346.305 388.792C346.695 389.4 347.135 390.35 347.592 391.676C348.5 394.312 349.305 397.931 349.991 402.032C351.358 410.204 352.174 419.807 352.504 426.156L358.496 425.844Z"
                    fill="black"
                  />
                  <path
                    d="M330.225 360.956C331.305 362.212 333.199 362.355 334.456 361.275C335.712 360.195 335.855 358.301 334.775 357.044L330.225 360.956ZM305.725 332.456L330.225 360.956L334.775 357.044L310.275 328.544L305.725 332.456Z"
                    fill="black"
                  />
                  <path d="M95 67.9999C105.167 59.3332 134 43.7999 168 50.9999" stroke="black" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div>
                  <p className="text-4xl font-bold">{scheduleData?.total_dosen || 0}</p>
                  <p className="text-gray-600">Dosen</p>
                </div>
                <div className="mt-4">
                  <p className="text-4xl font-bold">{scheduleData?.total_schedule || 0}</p>
                  <p className="text-gray-600">Jadwal Sidang</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-4">
              <span className="text-sm bg-blue-100 text-blue-600 px-4 py-1 rounded-full">Rata-rata jumlah sidang per dosen: {scheduleData?.avg_dosen.toFixed(2) || 0} Jadwal Sidang</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-8 w-full h-[300px] max-w-[500px] flex flex-col justify-between relative">
            <div className="flex items-center">
              <div className="bg-gray-200 w-40 h-40 rounded-md mr-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="170" viewBox="0 0 466 460" fill="none">
                  <path d="M382 210C382 223.476 371.937 234 360 234C348.063 234 338 223.476 338 210C338 196.524 348.063 186 360 186C371.937 186 382 196.524 382 210Z" fill="#E5B598" stroke="black" strokeWidth="6" />
                  <path d="M102 210C102 223.476 91.937 234 80 234C68.063 234 58 223.476 58 210C58 196.524 68.063 186 80 186C91.937 186 102 196.524 102 210Z" fill="#E5B598" stroke="black" strokeWidth="6" />
                  <path d="M328 421.275H111C121.8 334.475 189.833 317.108 222.5 319.275C305.7 321.675 327.5 388.275 328 421.275Z" fill="#4A535C" stroke="black" strokeWidth="6" strokeLinecap="round" />
                  <path
                    d="M221 403.602C193.4 406.402 161.167 365.102 148.5 344.102C164 330.602 178.5 321.102 221 319.102C255 317.502 281.5 335.102 290.5 344.102C275.3 388.102 237.833 402.102 221 403.602Z"
                    fill="#D9D9D9"
                    stroke="black"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path d="M210.5 355L201 393.5C216.6 410.7 232.833 400.667 239 393.5L229.5 355H210.5Z" fill="#007AFF" stroke="black" strokeWidth="6" strokeLinecap="round" />
                  <path d="M238 333.5C238 344.468 229.75 353 220 353C210.25 353 202 344.468 202 333.5C202 322.532 210.25 314 220 314C229.75 314 238 322.532 238 333.5Z" fill="#6EACEE" stroke="black" strokeWidth="6" />
                  <path d="M357 218.5C357 282.413 296.126 335 220 335C143.874 335 83 282.413 83 218.5C83 154.587 143.874 102 220 102C296.126 102 357 154.587 357 218.5Z" fill="#E5B598" stroke="black" strokeWidth="6" />
                  <rect x="55" y="42" width="330" height="36" rx="10" fill="#435058" />
                  <path
                    d="M114.001 43.5H72.001C65.3343 41.1667 52.201 39.6 53.001 52C54.001 67.5 45.5007 78 72.001 78C93.2011 78 277.834 78 367.5 78C374.5 79 388.5 78.1 388.5 66.5C388.5 52 395 43.5 367.5 43.5C345.5 43.5 217.667 43.5 156.5 43.5"
                    stroke="black"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M84.5 188.971L67 188.971C67 173.514 83.3333 150.55 91.5 141L350.5 139L357 137.5L373 188.971L352 188.971C350 164.986 343.5 164.986 314 181.642C290.4 194.968 245.833 187.195 226.5 181.642C155.7 150.194 98.3333 173.425 84.5 188.971Z"
                    fill="#C27059"
                    stroke="black"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path d="M292 402V423M164.5 402V423" stroke="black" strokeWidth="6" strokeLinecap="round" />
                  <rect x="83" y="81" width="274" height="57" fill="#435058" stroke="black" strokeWidth="6" />
                  <ellipse cx="150" cy="205.5" rx="6" ry="13.5" fill="#110800" />
                  <ellipse cx="291" cy="205.5" rx="6" ry="13.5" fill="#110800" />
                  <ellipse cx="291.53" cy="231.068" rx="6" ry="13.5" transform="rotate(89.7111 291.53 231.068)" fill="#F0888D" />
                  <ellipse cx="149.53" cy="231.068" rx="6" ry="13.5" transform="rotate(89.7111 149.53 231.068)" fill="#F0888D" />
                  <path d="M207 226C209.833 230.167 219.7 236 236.5 226" stroke="black" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div>
                  <p className="text-4xl font-bold">{scheduleData?.total_schedule || 0}</p>
                  <p className="text-gray-600">Mahasiswa</p>
                </div>
                <div className="mt-4">
                  <p className="text-4xl font-bold">{scheduleData?.unique_fields || 0}</p>
                  <p className="text-gray-600">Peminatan</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-4">
              <span className="text-sm bg-blue-100 text-blue-600 px-4 py-1 rounded-full">
                Rata-rata jumlah mahasiswa per peminatan: {scheduleData?.unique_fields > 0 ? (scheduleData?.total_schedule || 0) / scheduleData?.unique_fields : "Data tidak tersedia"} Jadwal Sidang
              </span>
            </div>
          </div>

          <BarChart />
        </div>
      ) : (
        <p>Data not available</p>
      )}
    </div>
  );
};

export default Overview;
