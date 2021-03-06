from pymongo import MongoClient
from pprint import pprint

db = MongoClient('localhost',27017)

mydb = db['dhi-mite']

users = mydb['dhi_user']
term_detail = mydb['dhi_term_detail']
lesson_plan = mydb['dhi_lesson_plan']
generic_attainment_configuration = mydb['dhi_generic_attainment_config']
generic_attainment_data = mydb['dhi_generic_attainment_data']

def get_course_code(facultyId,academicYear,termNumber):
    courses = lesson_plan.aggregate([
        {
            "$unwind":"$faculties"
        },
        {
            "$unwind":"$departments"
        },
        {
            "$match":{"academicYear":academicYear,
                "faculties.facultyGivenId":facultyId,
                "departments.termNumber":{"$in":termNumber}
            }
        },
        {
            "$group":{
                "_id":{
                        "courseCode":"$courseCode",
                        "section":"$departments.section",
                        "termNumber":"$departments.termNumber"
                }
            }
        },
        {
            "$project":{"courseCode":"$_id.courseCode",
                "section":"$_id.section",
                "termNumber":"$_id.termNumber",
                "_id":0
            }
        }
        ])
    
    course_codes = []

    for course in courses:
        course_codes.append(course)
    
    return course_codes

def get_cos_of_courses(facultyId,academicYear,termNumber):
    co_details_of_courses = []
    course_codes = get_course_code(facultyId,academicYear,termNumber)

    for course_code in course_codes:
        cos = generic_attainment_data.aggregate([
                {
                    "$unwind":"$faculties"
                },
                {
                    "$unwind":"$courseOutcomeDetailsForAttainment"
                },
                {
                    "$match":
                    {
                        "year":academicYear,
                        "faculties.facultyGivenId":facultyId,
                        "termNumber":course_code['termNumber'],
                        "courseDetails.courseCode":course_code['courseCode'],
                        "section":course_code['section']
                    }
                },
                {
                    "$limit":5
                },
                {
                    "$group":{
                        "_id":{
                            "courseCode":"$courseDetails.courseCode",
                            "section":"$section",
                            "courseName":"$courseDetails.courseName",
                            "courseType":"$courseDetails.courseType",
                            "deptId":"$deptId",
                            "termNumber":"$termNumber"
                        },
                        "average_co_attainments":{"$avg":"$courseOutcomeDetailsForAttainment.totalAttainment"},
                        
                        "co_details":{ "$push":{ "coNumber":"$courseOutcomeDetailsForAttainment.coNumber",
                                                 "coTitle":"$courseOutcomeDetailsForAttainment.coTitle",
                                                 "total_attainment":"$courseOutcomeDetailsForAttainment.totalAttainment",
                                                 "direct_attainment":"$courseOutcomeDetailsForAttainment.directAttainment",
                                                 "indirect_attainment":"$courseOutcomeDetailsForAttainment.indirectAttainment"},
                                             }
                                            
                    }
                    
                },
                
                {
                    "$project":
                    {
                        "average_co_attainments":1,
                        "courseCode":"$_id.courseCode",
                        "section":"$_id.section",
                        "courseName":"$_id.courseName",
                        "courseType":"$_id.courseType",
                        "deptId":"$_id.deptId",
                        "termNumber":"$_id.termNumber",
                        "co_details":1,
                        "_id":0
                    }
                }
            ])
        for co in cos:
            co_details_of_courses.append(co)

    return co_details_of_courses

def get_co_methods(academicYear,facultyGivenId,termNumber,section,courseCode,coNumber):
    coDetails = generic_attainment_data.aggregate( [ 
        { "$unwind" : "$faculties" } ,
        { "$unwind" : "$courseOutcomeDetailsForAttainment" },
        { "$match" : {
            "academicYear" : academicYear,
            "faculties.facultyGivenId" : facultyGivenId,
            "termNumber" : termNumber,
            "section" : section,
            "courseDetails.courseCode" : courseCode,
            "courseOutcomeDetailsForAttainment.coNumber" : coNumber
            } 
        },
        { "$project" : {
            "facultyId" : "$faculties.facultyGivenId",
            "facultyName" : "$faculties.facultyName",
            "courseCode" : "$courseDetails.courseCode",
            "courseName" : "$courseDetails.courseName",
            "coNumber" : "$courseOutcomeDetailsForAttainment.coNumber",
            "directAttainment" : "$courseOutcomeDetailsForAttainment.directAttainment",
            "indirectAttainment" : "$courseOutcomeDetailsForAttainment.indirectAttainment",
            "totalNumberOfStudents" : {
                "$size" : "$studentIds"
                },
            "directMethods" : "$courseOutcomeDetailsForAttainment.directMethods",
            "indirectMethods" : "$courseOutcomeDetailsForAttainment.indirectMethods",
            "_id" : 0
            } 
        },
        {
            "$limit":1
        }
        ] )
    
    co_methods = []     
    for field in coDetails:
        co_methods.append(field)
    return co_methods

def get_co_data(academicYear,facultyGivenId,termNumber,section,courseCode,coNumber,deptId,courseType):
    coMethods = get_co_methods(academicYear,facultyGivenId,termNumber,section,courseCode,coNumber)
    test_co_details = {}
    directMethods = []
    methods = []
    if len(coMethods) > 0:
    
        directMethods = coMethods[0]['directMethods']
        indirectMethods = coMethods[0]['indirectMethods']

        test_co_details['courseCode'] = coMethods[0]['courseCode']
        test_co_details['courseName'] = coMethods[0]['courseName']
        test_co_details['facultyId'] = coMethods[0]['facultyId']
        test_co_details['facultyName'] = coMethods[0]['facultyName']
        test_co_details['totalNumberOfStudents'] = coMethods[0]['totalNumberOfStudents']
        test_co_details['directAttainment'] = coMethods[0]['directAttainment']
        test_co_details['indirectAttainment'] = coMethods[0]['indirectAttainment']
        test_co_details['direct_attainment_details'] = []
        test_co_details['indirect_attainment_details'] = []
    
        weightage = get_weightage(academicYear,deptId,courseType)

        firstLevel = weightage[0]['firstLevelWeightage']
        direct_method_weightage = weightage[0]['directMethodsWeightage']
        indirect_method_weightage = weightage[0]['indirectMethodsWeightage']
        print(direct_method_weightage)

        test_co_details['directAttainmentWeightage'] = firstLevel['directMethodWeightage']
        test_co_details['indirectAttainmentWeightage'] = firstLevel['indirectMethodWeightage']

        for method in directMethods:
            if method['methodName'] == "IA":
                method_details = method['nextLevelAttainments']
            
            elif method['methodName'] == "Other Assessment":
                sub = []
                sub = method['subAssessmentMethods']
                method_details = sub[0]['nextLevelAttainments']
        
            else:
                if 'questionLevelAttainment' in method or 'questionLevelAttainmentPercentage'in method:
                    attainment = method['questionLevelAttainment']
                    attainmentPercentage = method['questionLevelAttainmentPercentage']
                else:
                    attainment = 0.0
                    attainmentPercentage = 0.0
                sub = []
                sub.append({
                    "numberOfStudentsParticipated" : method['numberOfStudentsParticipated'],
                    "numberOfTargetAttainedStudents" : method['numberOfTargetAttainedStudents'],
                    "attainment":attainment,
                    "attainmentPercentage": attainmentPercentage
                })
                method_details = sub

            test_co_details['direct_attainment_details'].append({
                "methodName" : method['methodName'],
                "description" : method['methodDescription'],
                "attainment" : method['attainment'],
                "attainmentPercentage" : method['attainmentPercentage'],
                "method_details" : method_details
                })

        for method in indirectMethods:
            if 'numberOfStudentsGivenFeedback' in method or 'percentageOfFeedback' in method:
                feedback = method['numberOfStudentsGivenFeedback']
                feedbackPercentage = method['percentageOfFeedback']
            else:
                feedback = 0
                feedbackPercentage = 0.0

            test_co_details['indirect_attainment_details'].append({
                "methodName" : method['methodName'],
                "description" : method['methodDescription'],
                "attainment" : method['attainment'],
                "attainmentPercentage" : method['attainmentPercentage'],
                "noOfStudentsGivenFeedback":feedback,
                "percentageOfFeedback":feedbackPercentage
                })
        
        for method in direct_method_weightage:
            methods = method['methods']
            weightage = method['weightage']
            for m in test_co_details['direct_attainment_details']:
                if m['methodName'] in methods:                 
                    m['weightage'] = weightage

        for method in indirect_method_weightage:
            methods = method['methods']
            weightage = method['weightage']
            for m in test_co_details['indirect_attainment_details']:
                if m['methodName'] in methods:                 
                    m['weightage'] = weightage

    return test_co_details
    
def get_weightage(academicYear,deptId,courseType):
    weightage = generic_attainment_configuration.aggregate([
        {"$unwind":"$subGenericAttainmentConfigurationList"},
        {
            "$match":{
                "academicYear":academicYear,
                "deptId" : deptId,
                "subGenericAttainmentConfigurationList.courseType":courseType
            }
        },
        {
            "$project":{
                "firstLevelWeightage" : "$subGenericAttainmentConfigurationList.firstLevelWeightage",
                "directMethodsWeightage" : "$subGenericAttainmentConfigurationList.directMethodsWeightage",
                "indirectMethodsWeightage" : "$subGenericAttainmentConfigurationList.indirectMethodsWeightage",
                "_id" : 0
            }
        }           
    ])
    
    weightages = []

    for w in weightage:
        weightages.append(w)
    return weightages

def get_rubrics_details(academicYear,deptId,courseType):
    rubrics = generic_attainment_configuration.aggregate([
        {
            "$unwind":"$subGenericAttainmentConfigurationList"
        },
        {
            "$match":{
                "academicYear":academicYear,
                "subGenericAttainmentConfigurationList.courseType":courseType,
                "deptId":deptId
            }
        },
        {
            "$project":{
                "subGenericAttainmentConfigurationList.directMethods.rubricDetail":1,
                "subGenericAttainmentConfigurationList.directMethods.target":1,
                "subGenericAttainmentConfigurationList.indirectMethods.target":1,
                "subGenericAttainmentConfigurationList.directMethods.rules":1,
                "subGenericAttainmentConfigurationList.indirectMethods.rules":1,
                "subGenericAttainmentConfigurationList.directMethods.methodName":1,
                "subGenericAttainmentConfigurationList.indirectMethods.methodName":1,
                "subGenericAttainmentConfigurationList.indirectMethods.rubricDetail":1,
                "_id":0
            }
        }

        ])

    rubric_details = []
    for rubric in rubrics:
        rubric_details.append(rubric)

    return rubric_details
