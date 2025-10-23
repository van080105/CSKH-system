import { useTranslation } from "react-i18next"

export function DevTeamPage() {
  const { t } = useTranslation()

  const teamMembers = [
    {
      id: 1,
      name: "Nguyễn Chí Thiện",
      role: "Admin",
      email: "thiennguyen@gmail.com",
      image: "/man-professional-green.jpg",
    },
    {
      id: 2,
      name: "Phạm Duy Quý",
      role: "Admin",
      email: "pdqui@gmail.com",
      image: "/man-with-glasses-dark.jpg",
    },
    {
      id: 3,
      name: "Huỳnh Kim Quý",
      role: "Admin",
      email: "kimquyhuynh@gmail.com",
      image: "/man-with-glasses-dark.jpg",
    },
    {
      id: 4,
      name: "Nguyễn Thị Cẩm Vân",
      role: "Admin",
      email: "vannguyen@gmail.com",
      image: "/woman-red.jpg",
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("teamMembers")}</h1>
        {/* Nút Add nếu cần dùng lại:
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Plus className="h-4 w-4" />
          Add New Member
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-lg border p-6 text-center hover:shadow-lg transition-shadow
              bg-white border-gray-200 text-gray-900
              dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            {/* Avatar */}
            <div className="mb-4 flex justify-center">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-gray-600"
              />
            </div>

            {/* Name and Role */}
            <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{member.role}</p>

            {/* Email */}
            <p className="text-xs text-gray-500 dark:text-gray-400 break-all">{member.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
