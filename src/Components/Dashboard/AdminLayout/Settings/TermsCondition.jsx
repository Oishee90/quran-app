// src/components/settings/TermsCondition.jsx
import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import {
  useGetMiscByNameQuery,
  useUpdateMiscByNameMutation,
} from "../../../../Redux/feature/auth/authapi";

const TermsCondition = () => {
  const editor = useRef(null);
  const NAME = "terms_and_condition";

  const { data, isLoading, isError, refetch } = useGetMiscByNameQuery(NAME);
  const [updateMisc, { isLoading: isUpdating }] = useUpdateMiscByNameMutation();

  const [content, setContent] = useState("");

  // ✅ Load content from API
  useEffect(() => {
    if (data?.content) {
      setContent(data.content);
    }
  }, [data]);

  const config = {
    readonly: false,
    toolbar: true,
    spellcheck: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: "bold,italic,underline,|,ul,|,align",
    removeButtons: ["image", "video", "table", "link", "print", "about"],
    toolbarAdaptive: false,
    minHeight: 300,
    style: {
      font: "14px/1.6 Arial, sans-serif",
      color: "#767676",
    },
  };

  // ✅ SAVE HANDLER
  const handleUpdate = async () => {
    try {
      await updateMisc({
        name: NAME,
        content,
      }).unwrap();
      refetch();
      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        confirmButtonColor: "#2658C4",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "Something went wrong",
      });
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load content</div>;

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="px-7 py-2 bg-[#2658C4] text-white text-sm font-medium rounded-lg disabled:opacity-50"
        >
          {isUpdating ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default TermsCondition;
