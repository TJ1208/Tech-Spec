import CategoryModel from "../../models/category";
import CreateCategory from "@/app/admin/category/create-category";
import { DeleteCategoryButton } from "./delete-category";
import { getAllCategories } from "@/app/api/category";
import { UpdateCategoryButton } from "./update-category";

const AdminCategory = async () => {
    const categories = await getAllCategories();
    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left rounded">
                    <caption className="caption-top p-5 font-semibold">
                        Categories
                        {
                            <p>({categories.length})</p>
                        }
                    </caption>

                    <thead className="bg-gray-600">
                        <tr>
                            <th className="font-semibold px-2">#</th>
                            <th className="font-semibold px-2">Name</th>
                            <th className="font-semibold px-2">Image</th>
                            <th className="font-semibold px-2">
                                <div className="flex w-full justify-between items-center">
                                    <p>Actions</p>
                                    <CreateCategory />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll">
                        {
                            categories.map((category: CategoryModel, i: number) => (
                                <tr className="hover:bg-slate-600 cell" key={i}>
                                    <td className="p-2">{i + 1}</td>
                                    <td className="p-2">{category.name}</td>
                                    <td className="p-2"><img src={category.image?.url} alt="Category Image" className="w-16 object-cover rounded" /></td>
                                    <td className="p-2">
                                        <div className="flex items-center">
                                            <div className="p-1">
                                                <UpdateCategoryButton {...category} />
                                            </div>
                                            <div>
                                                <DeleteCategoryButton {...category} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default AdminCategory;