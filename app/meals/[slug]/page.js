"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import classes from "./page.module.css";

export default function MealsDetails({ params }) {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      const res = await fetch("http://localhost:3000/dummyMeals");
      const data = await res.json();
      const slug = params.slug;
      const selectedMeal = data.find((meal) => meal.slug === slug);
      setMeal(selectedMeal);
    };

    if (params && params.slug) {
      fetchMeal();
    }
  }, [params]);
  if (!meal) {
    return <p>Loading...</p>;
  }

  const instructions = meal.instructions.replace(/\n/g, "<br/>");
  const { title, image, summary, creator, creator_email } = meal;
  console.log(image);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={image} alt={title} width={400} height={300} />
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={classes.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: instructions }}
        ></p>
      </main>
    </>
  );
}
