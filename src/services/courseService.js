import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
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
