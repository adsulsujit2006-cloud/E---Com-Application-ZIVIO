export const uploadToCloudinary = async (pics: any) => {
    const cloud_name = "htmyejaf";
    const upload_preset = "zivioImage";

    if (!pics) {
        throw new Error("No file provided to uploadToCloudinary");
    }

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
        {
            method: "POST",
            body: data,
        }
    );

    const fileDate = await res.json();

    if (!res.ok) {
        // Cloudinary returns error details in fileDate.error.message
        throw new Error(
            fileDate?.error?.message || `Cloudinary upload failed with status ${res.status}`
        );
    }

    if (!fileDate.secure_url && !fileDate.url) {
        throw new Error("Cloudinary response did not include a URL");
    }

    return fileDate.secure_url ?? fileDate.url;
};