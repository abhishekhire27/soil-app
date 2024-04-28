import Card from "../../components/cards/Card";
import Header from "../../components/header/Header";
import { useAuth } from "../../components/auth/AuthProvider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/layouts/Button";
import Meal from "../../components/meal/Meal";

function DietPlan() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
  const [targetCalories, setTargetCalories] = useState(0);
  const [targetWeight, setTargetWeight] = useState();
  const [targetDays, setTargetDays] = useState(365);
  const [mealPlanPeriod, setMealPlanPeriod] = useState("Daily");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateMealPlan = () => {
    let timeFrame = "";
    if (mealPlanPeriod === "Daily") {
      timeFrame = "day";
    }
    if (mealPlanPeriod === "Weekly") {
      timeFrame = "week";
    }
    let baseUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=5ec7a1986f3747e695943a7260c80f78&timeFrame=${timeFrame}&targetCalories=${targetCalories}`;

    if (user.dietaryPreference) {
      baseUrl += `&diet=${user.dietaryPreference}`;
    }
    setLoading(true);
    fetch(baseUrl)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (!res["meals"] && !res["week"]) {
          return;
        }
        const myMeals = [];

        if (res["meals"]) {
          res["meals"].forEach((meal) => {
            myMeals.push(<Meal {...meal} key={meal.id}></Meal>);
          });
        }
        if (res["week"]) {
          Object.keys(res["week"]).forEach((week) => {
            const thisWeekMeals = [];

            res["week"][week]["meals"].forEach((meal) => {
              thisWeekMeals.push(<Meal {...meal} key={meal.id}></Meal>);
            });

            myMeals.push(
              <div key={week}>
                <h4>{week.charAt(0).toUpperCase() + week.slice(1)}</h4>
                <div>{thisWeekMeals}</div>
              </div>
            );
          });
        }

        setMeals(myMeals);
      });
  };

  const calculateTargetCalories = () => {
    let activityFactor = 1;
    if (user.activityLevel === "Lightly Active") {
      activityFactor = 1.2;
    }
    if (user.activityLevel === "Active") {
      activityFactor = 1.5;
    }
    if (user.activityLevel === "Very Active") {
      activityFactor = 1.7;
    }
    const bmr =
      10 * parseInt(user.weight) +
      6.25 * parseInt(user.height) -
      5 * parseInt(user.age) +
      5;

    const tdee = bmr * activityFactor;
    const weightDiff = targetWeight - parseInt(user.weight);
    const calDiff = weightDiff * 7700;
    const dailyCalDiff = calDiff / targetDays;
    setTargetCalories(parseFloat(tdee + dailyCalDiff).toFixed(2));
  };

  useEffect(() => {
    if (user && "weight" in user) {
      setTargetWeight(user.weight);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (!user.height || !user.weight || !user.age || !user.activityLevel) {
      setIsProfileIncomplete(true);
      return;
    }
    if (targetDays && targetWeight) calculateTargetCalories();
    else setTargetCalories(0);
  }, [user, setIsProfileIncomplete, targetWeight, targetDays]);

  return (
    <>
      <Header />
      <div className="profile-container">
        <Card title="Diet Plan">
          {isProfileIncomplete ? (
            <div>
              Please complete your
              <a
                onClick={() => {
                  navigate("/profile");
                }}
                href="#"
              >
                profile
              </a>
            </div>
          ) : (
            <div>
              <div>
                {user ? <p>Current Weight: {user.weight} kgs</p> : null}
              </div>
              <div className="d-flex align-items-center">
                <p>Target Weight:</p>
                <input
                  value={targetWeight}
                  className="me-2 mb-0"
                  onChange={(e) => {
                    setTargetWeight(e.target.value);
                  }}
                />{" "}
                kgs
              </div>
              <div className="d-flex align-items-center">
                Target Days:
                <input
                  value={targetDays}
                  onChange={(e) => {
                    setTargetDays(e.target.value);
                  }}
                />
              </div>
              {targetCalories ? (
                <>
                  <p>Required Calories: {targetCalories} cal/day</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <select
                        style={{ width: "180px" }}
                        value={mealPlanPeriod}
                        onChange={(e) => {
                          setMealPlanPeriod(e.target.value);
                        }}
                        className="form-control"
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                      </select>
                    </div>
                    <Button
                      buttonName="Generate Meal Plan"
                      onClick={generateMealPlan}
                      disabled={loading}
                    />
                  </div>
                  {loading ? (
                    <div className="p-4 d-flex align-items-center">
                      <p>Fetching your food...</p>
                    </div>
                  ) : (
                    <div>{meals}</div>
                  )}
                </>
              ) : null}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

export default DietPlan;
