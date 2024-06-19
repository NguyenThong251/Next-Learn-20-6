import Link from "next/link";
import "../globals.css";
import classes from "./page.module.css";
import MealGrid from "@/components/meals/meals-grid";
import { Suspense } from "react";

async function Meals() {
  const res = await fetch("http://localhost:3000/dummyMeals");
  // if (!res.ok) {
  //   const errorMessage = `Failed to fetch data. Status code: ${res.status}`;
  // }
  const meals = await res.json();
  return <MealGrid meals={meals} />;
}

export default function MealPage() {
  return (
    <>
      <header className="flex flex-col gap-4 mt-5 ">
        <h1 className="text-4xl font-bold text-center text-white">
          Delicious meals, created{" "}
          <span className="text-orange-500">By you</span>
        </h1>
        <p className="w-2/3 mx-auto text-2xl font-medium text-center text-white">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
          magnam? Ducimus quos non modi laborum dicta
        </p>
        <div className="flex mx-auto">
          <button className="px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-700">
            <Link href="/meals/share">Share Your Favorite Recipe</Link>
          </button>
        </div>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<h1 className={classes.loading}>Loading...</h1>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
