import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Failure from '../FailureView'
import './index.css'
import CourseItem from '../CourseItemCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Homepage extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseStack: []}

  componentDidMount() {
    this.getCourseStack()
  }

  getCourseStack = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const coursesUrl = `https://apis.ccbp.in/te/courses`
    const response = await fetch(coursesUrl)
    if (response.ok === true) {
      const coursesData = await response.json()
      const formattedCoursesData = coursesData.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        courseStack: formattedCoursesData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height={40} width={40} color="#1e293b" />
    </div>
  )

  appendCourses = () => {
    const {courseStack} = this.state

    return (
      <>
        <Header />
        <div className="home-page-container">
          <h1 className="Course-heading">Courses</h1>
          <ul className="courses-bg-container">
            {courseStack.map(eachCourse => (
              <CourseItem key={eachCourse.id} courseDetails={eachCourse} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  onRetryFetch = () => {
    this.setState({apiStatus: apiStatusConstants.initial}, this.getCourseStack)
  }

  renderFailureView = () => <Failure onRetry={this.onRetryFetch} />

  appendApiResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.appendCourses()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="Home-bg-container">{this.appendApiResults()}</div>
  }
}

export default Homepage
