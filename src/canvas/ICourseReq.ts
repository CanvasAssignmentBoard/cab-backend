import ICourseProgressReq from "./ICourseProgressReq"
import IEnrollmentReq from "./IEnrollmentReq"
import ITermReq from "./ITermReq"

export type test = {
    // the unique identifier for the course
  id: any,

  // the SIS identifier for the course, if defined. This field is only included if
  // the user has permission to view SIS information.
  sis_course_id?: any,

  // the UUID of the course
  uuid: any,

  // the integration identifier for the course, if defined. This field is only
  // included if the user has permission to view SIS information.
  integration_id?: any,

  // the unique identifier for the SIS import. This field is only included if the
  // user has permission to manage SIS information.
  sis_import_id: any,

  // the full name of the course
  name: any,

  // the course code
  course_code: any,

  // the current state of the course one of 'unpublished', 'available',
  // 'completed', or 'deleted'
  workflow_state: any,

  // the account associated with the course
  account_id: any,

  // the root account associated with the course
  root_account_id: any,

  // the enrollment term associated with the course
  enrollment_term_id: any,

  // the grading standard associated with the course
  grading_standard_id: any,

  // the grade_passback_setting set on the course
  grade_passback_setting: any,

  // the date the course was created.
  created_at: any,

  // the start date for the course, if applicable
  start_at: any,

  // the end date for the course, if applicable
  end_at: any,

  // the course-set locale, if applicable
  locale: any,

  // A list of enrollments linking the current user to the course. for student
  // enrollments, grading information may be included if include[]=total_scores
  enrollments?: any[],

  // optional: the total number of active and invited students in the course
  total_students?: any,

  // course calendar
  calendar: any[],

  // the type of page that users will see when they first visit the course -
  // 'feed': Recent Activity Dashboard - 'wiki': Wiki Front Page - 'modules':
  // Course Modules/Sections Page - 'assignments': Course Assignments List -
  // 'syllabus': Course Syllabus Page other types may be added in the future
  default_view: any,

  // optional: user-generated HTML for the course syllabus
  syllabus_body?: any,

  // optional: the number of submissions needing grading returned only if the
  // current user has grading rights and include[]=needs_grading_count
  needs_grading_count?: any,

  // optional: the enrollment term object for the course returned only if
  // include[]=term
  term?: any,

  // optional: information on progress through the course returned only if
  // include[]=course_progress
  course_progress?: any,

  // weight final grade based on assignment group percentages
  apply_assignment_group_weights?: any,

  // optional: the permissions the user has for the course. returned only for a
  // single course and include[]=permissions
  permissions?: {
    create_discussion_topic: any,
    create_announcement: any
  },
  is_public: any,
  is_public_to_auth_users: any,
  public_syllabus: any,
  public_syllabus_to_auth: any,

  // optional: the public description of the course
  public_description?: any,
  storage_quota_mb: any,
  storage_quota_used_mb: any,
  hide_final_grades: any,
  license: any,
  allow_student_assignment_edits: any,
  allow_wiki_comments: any,
  allow_student_forum_attachments: any,
  open_enrollment: any,
  self_enrollment: any,
  restrict_enrollments_to_course_dates: any,
  course_format: any,

  // optional: this will be true if this user is currently prevented from viewing
  // the course because of date restriction settings
  access_restricted_by_date?: any,

  // The course's IANA time zone name.
  time_zone: any,

  // optional: whether the course is set as a Blueprint Course (blueprint fields
  // require the Blueprint Courses feature)
  blueprint?: any,

  // optional: Set of restrictions applied to all locked course objects
  blueprint_restrictions?: {
    content: any,
    points: any,
    due_dates: any,
    availability_dates: any
  },

  // optional: Sets of restrictions differentiated by object type applied to
  // locked course objects
  blueprint_restrictions_by_object_type?: {
    assignment: {
      content: any,
      points: any
    },
    wiki_page: {
      content: any
    }
  }
}
