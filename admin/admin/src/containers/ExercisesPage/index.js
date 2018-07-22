import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import Home from "./Home"
import ChapterExercisePage from "./ChapterExercisePage"
import LessonExercisePage from "./LessonExercisePage"

class ExercisePage extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/plugins/content-manager/exercise/create/chapter"
          component={ChapterExercisePage}
        />
        <Route
          path="/plugins/content-manager/exercise/create/lesson"
          component={LessonExercisePage}
        />
        <Route path="" component={Home} exact />
      </Switch>
    )
  }
}

export default ExercisePage
