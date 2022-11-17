import NewCard from "../NewCard/NewCard";
import TodoItem from "../TodoItem/TodoItem";

const Main = () => {
  return (
    <>
    <section className="page">
      <button className="new-card-button" />
      <TodoItem />
    </section>
    <NewCard />
    </>
  )
}

export default Main;
