import { collection, getDocs, query, where, orderBy, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig.js';

export async function getAllCourses() {
  try {
    const coursesCollection = collection(db, 'courses');
    const q = query(coursesCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const courses = [];
    querySnapshot.forEach((doc) => {
      courses.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function getCourseById(courseId) {
  try {
    const courseDoc = doc(db, 'courses', courseId);
    const courseSnapshot = await getDoc(courseDoc);
    
    if (courseSnapshot.exists()) {
      return {
        id: courseSnapshot.id,
        ...courseSnapshot.data()
      };
    } else {
      console.error('Course not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

export async function saveCourseRegistration(registrationData) {
  try {
    const registrationsCollection = collection(db, 'course_registrations');
    const docRef = await addDoc(registrationsCollection, {
      ...registrationData,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    
    console.log('Registration saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving registration:', error);
    throw error;
  }
}

export async function getCoursesByCategory(category) {
  try {
    const coursesCollection = collection(db, 'courses');
    const q = query(
      coursesCollection,
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const courses = [];
    querySnapshot.forEach((doc) => {
      courses.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return courses;
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    return [];
  }
}

export async function getCoursesByLevel(level) {
  try {
    const coursesCollection = collection(db, 'courses');
    const q = query(
      coursesCollection,
      where('level', '==', level),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const courses = [];
    querySnapshot.forEach((doc) => {
      courses.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return courses;
  } catch (error) {
    console.error('Error fetching courses by level:', error);
    return [];
  }
}
