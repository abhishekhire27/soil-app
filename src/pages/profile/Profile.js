import React, { useState, useEffect } from "react";
import Card from "../../components/cards/Card";
import Button from "../../components/layouts/Button";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toaster/ToastContext";
import "./Profile.css";
import Header from "../../components/header/Header";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";
import { useAuth } from "../../components/auth/AuthProvider";
import bcrypt from "bcryptjs-react";

function Profile() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user, setUser } = useAuth();

  const [userData, setUserData] = useState({
    name: user.name,
    emailId: user.emailId,
    password: user.password,
    cartId: user.cartId,
    joiningDate: user.joiningDate,
    age: user.age,
    height: user.height,
    weight: user.weight,
    dietaryPreference: user.dietaryPreference,
    healthGoal: user.healthGoal,
    activityLevel: user.activityLevel,
  });

  const [passwordFields, setPasswordFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        emailId: user.emailId,
        joiningDate: user.joiningDate,
        age: user.age || "",
        height: user.height || "",
        weight: user.weight || "",
        dietaryPreference: user.dietaryPreference || "",
        healthGoal: user.healthGoal || "",
        activityLevel: user.activityLevel || "",
      });
    } else {
      addToast("No user data found.", { type: "error" });
      navigate("/login");
    }
  }, [user, addToast, navigate]);

  const handleSave = async () => {
    if (validateInputs()) {
      let users = [];
      const localUsers = JSON.parse(localStorage.getItem("users"));
      if (localUsers) {
        users = localUsers;
      }
      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, ...userData } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("user", JSON.stringify({ ...user, ...userData }));

      setUser(userData);
      addToast("Profile updated successfully.", { type: "success" });
      setEditMode(false);
    }
  };

  const handleDeleteProfile = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      const updatedUsers = JSON.parse(localStorage.getItem("users")).filter(
        (u) => u.id !== user.id
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setUser(null);
      localStorage.removeItem("user");

      addToast("Profile deleted successfully.", { type: "info" });
      navigate("/");
    }
  };

  async function hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      addToast("New passwords do not match.", { type: "error" });
      return;
    }
    let users = [];
    const localUsers = JSON.parse(localStorage.getItem("users"));
    if (localUsers) {
      users = localUsers;
    }
    const userIndex = users.findIndex((dbUser) => dbUser.id === user.id);

    if (userIndex !== -1) {
      users[userIndex].password = await hashPassword(
        passwordFields.newPassword
      );
      localStorage.setItem("users", JSON.stringify(users));
      setPasswordFields({
        newPassword: "",
        confirmPassword: "",
      });
      addToast("Password changed successfully!", { type: "success" });
      closeModal();
    } else {
      addToast("User not found!", { type: "error" });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name in passwordFields) {
      setPasswordFields((prev) => ({ ...prev, [name]: value }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateInputs = () => {
    let isValid = true;
    let newErrors = {};

    if (
      userData.age &&
      (userData.age <= 0 || (isNaN(userData.age) && userData.height > 150))
    ) {
      newErrors.age = "Please enter a valid age.";
      isValid = false;
    }

    if (
      userData.height &&
      (userData.height <= 0 ||
        (isNaN(userData.height) && userData.height > 300))
    ) {
      newErrors.height = "Please enter a valid height.";
      isValid = false;
    }
    if (
      userData.weight &&
      (userData.weight <= 0 ||
        (isNaN(userData.weight) && userData.weight > 300))
    ) {
      newErrors.weight = "Please enter a valid weight.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Header />
      <div className="profile-container">
        <Card title="Your Profile">
          <div
            className={`profile-container ${
              editMode ? "edit-mode" : "view-mode"
            }`}
          >
            {editMode ? (
              <>
                <div className="form-group">
                  <label htmlFor="nameInput">Name:</label>
                  <input
                    id="nameInput"
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ageInput">Age:</label>
                  <input
                    id="ageInput"
                    type="number"
                    name="age"
                    value={userData.age}
                    onChange={handleChange}
                    className="form-control"
                    min="0"
                    max="100"
                  />
                  {errors.age && <div className="error">{errors.age}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="heightInput">Height (cm):</label>
                  <input
                    id="heightInput"
                    type="number"
                    name="height"
                    value={userData.height}
                    onChange={handleChange}
                    className="form-control"
                    min="0"
                    max="300"
                  />
                  {errors.height && (
                    <div className="error">{errors.height}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="weightInput">Weight (kg):</label>
                  <input
                    id="weightInput"
                    type="number"
                    name="weight"
                    value={userData.weight}
                    onChange={handleChange}
                    className="form-control"
                    min="0"
                    max="300"
                  />
                  {errors.weight && (
                    <div className="error">{errors.weight}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="dietaryPreference">Dietary Preference:</label>
                  <select
                    id="dietaryPreference"
                    name="dietaryPreference"
                    value={userData.dietaryPreference}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">No Preference</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Pescatarian">Pescatarian</option>
                    <option value="Ovo Vegetarian">Ovo Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="healthGoal">Health Goal:</label>
                  <select
                    id="healthGoal"
                    name="healthGoal"
                    value={userData.healthGoal}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">No Selection</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Weight Gain">Weight Gain</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="activityLevel">Activity Level:</label>
                  <select
                    id="activityLevel"
                    name="activityLevel"
                    value={userData.activityLevel}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">No Selection</option>
                    <option value="Sedentary">Sedentary</option>
                    <option value="Lightly Active">Lightly Active</option>
                    <option value="Active">Active</option>
                    <option value="Very Active">Very Active</option>
                  </select>
                </div>
                <Button buttonName="Save All Changes" onClick={handleSave} />
              </>
            ) : (
              <>
                <div className="d-flex flex-row">
                  <strong className="me-2">Name:</strong>
                  <p>{userData.name}</p>
                </div>
                <div className="d-flex flex-row">
                  <strong className="me-2">Email:</strong>
                  <p>{userData.emailId}</p>
                </div>
                <div className="d-flex flex-row">
                  <strong className="me-2">Date of Joining:</strong>
                  <p>{userData.joiningDate}</p>
                </div>
                <div className="d-flex flex-row">
                  <strong className="me-2">Age:</strong>
                  <p>{userData.age}</p>
                </div>
                <div className="d-flex flex-row">
                  <strong className="me-2">Height (cm):</strong>
                  <p>{userData.height}</p>
                </div>
                <div className="d-flex flex-row">
                  <strong className="me-2">Weight (kg):</strong>
                  <p>{userData.weight}</p>
                </div>
                <div className="d-flex flex-row">
                  <strong className="me-2">Dietary Preference:</strong>
                  <p>{userData.dietaryPreference}</p>
                </div>
                <div className="d-flex flex-row">
                  <strong className="me-2">Health Goal:</strong>
                  <p>{userData.healthGoal}</p>
                </div>
                <div className="d-flex flex-row">
                  <strong className="me-2">Activity Level:</strong>
                  <p>{userData.activityLevel}</p>
                </div>
                <Button buttonName="Edit" onClick={handleEdit} />
                <Button buttonName="Change Password" onClick={openModal} />
                <Button
                  buttonName="Delete Profile"
                  onClick={handleDeleteProfile}
                />

                <ChangePasswordModal isOpen={isModalOpen} close={closeModal}>
                  <form onSubmit={handlePasswordChange}>
                    <h2 style={{ color: "#2d5c7d" }}>Change Password</h2>
                    <div className="form-group mt-2">
                      <label>New Password:</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordFields.newPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password:</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordFields.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button buttonName="Submit" type="submit" />
                    <Button buttonName="Cancel" onClick={closeModal} />
                  </form>
                </ChangePasswordModal>
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export default Profile;
