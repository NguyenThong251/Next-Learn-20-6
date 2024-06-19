"use client";
import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { useState } from "react";

export default function ShareMealPage() {
  const [image, setImage] = useState(null);
  async function shareMeal(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const meal = {
      title: formData.get("title"),
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      creator_email: formData.get("email"),
      creator: formData.get("name"),
      image: image,
    };
    console.log(meal.image);
    const response = await fetch("http://localhost:3000/dummyMeals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    });
    if (response.ok) {
      console.log("Meal shared successfully");
    } else {
      console.error("Failed to share meal");
    }
  }
  function handleImageChange(selectedImage) {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  }
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={shareMeal}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker
            label="Your image"
            name="image"
            onImageChange={handleImageChange}
          />
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
