import { useState } from "react";
import Layout from "../components/layout/Layout";
import {
    changePassword,
    updateEmail,
      uploadProfile
} from "../services/managerService";
import { toast } from "react-toastify";

function Profile() {

    const manager = JSON.parse(localStorage.getItem("manager"));

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [newEmail, setNewEmail] = useState(manager.email);

const [emailPassword, setEmailPassword] = useState("");
const [selectedImage, setSelectedImage] = useState(null);

const [preview, setPreview] = useState(

    manager.profileImage
        ?

        `https://inventory-management-system-zpbq.onrender.com/uploads/${manager.profileImage}`

        :

        "https://cdn-icons-png.flaticon.com/512/149/149071.png"

);

const handleUpdateEmail = async (e) => {

    e.preventDefault();

    try {

        const res = await updateEmail({

            managerId: manager.id,

            newEmail,

            password: emailPassword

        });

        localStorage.setItem(

            "manager",

            JSON.stringify(res.data.manager)

        );

        toast.success(res.data.message);

        setEmailPassword("");

        window.location.reload();

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Email Update Failed"

        );

    }

};

const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    setPreview(URL.createObjectURL(file));

};

const handleUploadImage = async () => {

    if (!selectedImage) {

        toast.error("Please select an image");

        return;

    }

    try {

        const formData = new FormData();

        formData.append("profile", selectedImage);

        formData.append(

            "managerId",

            manager.id

        );

        const res = await uploadProfile(formData);

        const updatedManager = {

            ...manager,

            profileImage: res.data.image

        };

        localStorage.setItem(

            "manager",

            JSON.stringify(updatedManager)

        );

        toast.success(res.data.message);

        window.location.reload();

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Upload Failed"

        );

    }

};

    const handleChangePassword = async (e) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            const res = await changePassword({

                managerId: manager.id,

                currentPassword,

                newPassword

            });

            toast.success(res.data.message);

            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Password Change Failed"

            );

        }

    };

    return (

        <Layout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>

                            Manager Profile

                        </h3>

                    </div>

                    <div className="card-body">
                        <div className="text-center mb-4">

    <img

        src={preview}

        alt="Profile"

        className="rounded-circle border shadow"

        style={{

            width: "160px",

            height: "160px",

            objectFit: "cover"

        }}

    />

    <div className="mt-3">

    <input

        type="file"

        id="profileImage"

        accept="image/*"

        style={{ display: "none" }}

        onChange={handleImageChange}

    />

    <button

        type="button"

        className="btn btn-outline-primary"

        onClick={() =>

            document

                .getElementById("profileImage")

                .click()

        }

    >

        Update Profile Picture

    </button>

</div>

  {

    selectedImage && (

        <button

            type="button"

            className="btn btn-success mt-3"

            onClick={handleUploadImage}

        >

            Save Picture

        </button>

    )

}

</div>

                        <div className="mb-3">

                            <label className="form-label">

                                Name

                            </label>

                            <input

                                className="form-control"

                                value={manager.name}

                                disabled

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Email

                            </label>

                            <input

                                className="form-control"

                                value={manager.email}

                                disabled

                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">

                                Role

                            </label>

                            <input

                                className="form-control"

                                value={manager.role}

                                disabled

                            />

                        </div>
                        <hr />

<h4 className="mb-3">

    Update Email

</h4>

<form onSubmit={handleUpdateEmail}>

    <div className="mb-3">

        <input

            type="email"

            className="form-control"

            placeholder="New Email"

            value={newEmail}

            onChange={(e) =>
                setNewEmail(e.target.value)
            }

            required

        />

    </div>

    <div className="mb-3">

        <input

            type="password"

            className="form-control"

            placeholder="Current Password"

            value={emailPassword}

            onChange={(e) =>
                setEmailPassword(e.target.value)
            }

            required

        />

    </div>

    <button
        className="btn btn-success mb-4"
    >
        Update Email
    </button>

</form>


                        <hr />

                        <h4 className="mb-3">

                            Change Password

                        </h4>

                        <form onSubmit={handleChangePassword}>

                            <div className="mb-3">

                                <input

                                    type="password"

                                    className="form-control"

                                    placeholder="Current Password"

                                    value={currentPassword}

                                    onChange={(e)=>

                                        setCurrentPassword(e.target.value)

                                    }

                                    required

                                />

                            </div>

                            <div className="mb-3">

                                <input

                                    type="password"

                                    className="form-control"

                                    placeholder="New Password"

                                    value={newPassword}

                                    onChange={(e)=>

                                        setNewPassword(e.target.value)

                                    }

                                    required

                                />

                            </div>

                            <div className="mb-3">

                                <input

                                    type="password"

                                    className="form-control"

                                    placeholder="Confirm New Password"

                                    value={confirmPassword}

                                    onChange={(e)=>

                                        setConfirmPassword(e.target.value)

                                    }

                                    required

                                />

                            </div>

                            <button

                                className="btn btn-primary"

                            >

                                Change Password

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Profile;