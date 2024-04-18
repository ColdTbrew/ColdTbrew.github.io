const TutorialHeader = props => {
   return (
      <header className="hero is-primary is-small has-background-link">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Tutorial ({ props.subtitle })</h1>
        </div>
      </div>
    </header>
   );
}

export default TutorialHeader;          