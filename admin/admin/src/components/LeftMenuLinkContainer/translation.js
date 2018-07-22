const lang = {
  Exercises: "Bài Tập",
  Milestones: "Bia Đá",
  Timelines: "Dòng thời gian"
}

export default key => {
  return lang[key] || key
}
