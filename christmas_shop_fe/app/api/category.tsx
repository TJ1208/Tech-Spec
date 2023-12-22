import CategoryModel from "@/app/models/category"

export const getAllCategories = async (): Promise<CategoryModel[]> => {
    const response = await fetch("http://localhost:5000/category", {
        next: {
            tags: ['categories'],
            revalidate: 0
        }
    })
    const data = await response.json();
    return data;
}

export const  addCategory = async (category: CategoryModel): Promise<{message: string, code: number}> => {
    const response = await fetch('http://localhost:5000/category', {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const deleteCategory = async (name: string): Promise<string> => {
    const response = await fetch(`http://localhost:5000/category/${name}`, {
        method: 'DELETE',
    });
    return response.json();
}

export default getAllCategories;