export class CourseManager {
    static getCourses() {
        return JSON.parse(localStorage.getItem("courses")) || [];
    }

    static saveCourses(courses) {
        localStorage.setItem("courses", JSON.stringify(courses));
    }

    static addCourse(course) {
        const courses = this.getCourses(); 
        courses.push(course);
        this.saveCourses(courses);
        return course;
    }

    static deleteCourse(courseId) {
        let courses = this.getCourses();
        const updatedCourses = courses.filter(course => course.id !== courseId);
    
        if (courses.length === updatedCourses.length) {
            return false; 
        }
    
        this.saveCourses(updatedCourses);  
        return true; 
    }

    static updateCourse(courseId, updatedData) {
        let courses = this.getCourses();
        const courseIndex = courses.findIndex(course => course.id === courseId);

        if (courseIndex !== -1) {
            courses[courseIndex] = { ...courses[courseIndex], ...updatedData };
            this.saveCourses(courses);
            return courses[courseIndex];
        }

        return null;
    }
}