import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EditProfileForm from "../components/EditProfileForm";

export function Profile() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [userData, setUserData] = useState(null); 
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/accounts/my", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Lỗi fetch user:", await res.json());
          return;
        }

        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Lỗi fetch user:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) return <div>Loading...</div>; // Loading khi chưa fetch xong

  return (
    <div className="min-h-full">
      <div className="h-32 bg-gradient-to-r from-indigo-600 to-indigo-700"></div>

      <div className="max-w-4xl mx-auto px-6 -mt-16">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <img
                src="/diverse-woman-avatar.png"
                alt={userData.Fullname}
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.Fullname}</h1>
                <p className="text-gray-600 dark:text-gray-300">{userData.Role}</p>
              </div>
            </div>

            <button
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              onClick={() => setShowEditForm(true)}
            >
              {t("modify")}
            </button>

            {showEditForm && 
							<EditProfileForm
								userData={userData} 
								extraInfo={{
									Privilege: userData.Privilege,
									ReceiverID: userData.ReceiverID,
									Status: userData.Status,
									ResponsibleField: userData.ResponsibleField,
									Membership: userData.Membership,
								}}						
								onClose={() => setShowEditForm(false)}
								onUpdate={(updatedData) => setUserData(updatedData)} 
							/>
						}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ID</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">{userData.ID}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("fullNameProfile")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">{userData.Fullname}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("address")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">{userData.AddressAcc}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("emailProfile")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">{userData.Email}</div>
            </div>

						{/* Extra Info theo Role */}
						{userData.Role === "Admin" && (
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("priviledges")}</label>
								<div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">{userData.Privilege}</div>
							</div>
						)}

						{userData.Role === "Agent" && (
							<>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("receiverID")}</label>
									<div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">{userData.ReceiverID}</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("status")}</label>
									<div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">{userData.Status}</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("responsibleField")}</label>
									<div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">{userData.ResponsibleField}</div>
								</div>
							</>
						)}

						{userData.Role === "Customer" && (
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("membershipLevel")}</label>
								<div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">{userData.Membership}</div>
							</div>
						)}

          </div>
        </div>
      </div>
    </div>
  );
}
