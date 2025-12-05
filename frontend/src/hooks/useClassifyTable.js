export const addClassifyTable = async (table) => {
	try {
		const token = localStorage.getItem("token");
		const res = await fetch("http://localhost:8080/admin/table/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				NameTable: table.Name,
				ParentId: table.ParentId, 
			}),
		});
		return await res.json();
	} catch (err) {
		console.log("Error when add classify table:", err);
	}
};

export const updateClassifyTable = async (table) => {
	try {
		const token = localStorage.getItem("token");
		const res = await fetch("http://localhost:8080/admin/table/update/" + table.ID, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				NameTable: table.Name,
				ParentId: table.ParentId,
			}),
		});
		return await res.json();
	} catch (err) {
		console.log("Error when update classify table:", err);
	}
};

export const deleteClassifyTable = async (table) => {
	try {
		const token = localStorage.getItem("token");
		const res = await fetch("http://localhost:8080/admin/table/delete/" + table.ID, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return await res.json();
	} catch (err) {
		console.log("Error when delete classify table:", err);
	}
};
